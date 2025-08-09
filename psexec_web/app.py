from flask import Flask, render_template, request, jsonify
import subprocess
import shlex
import sys
from typing import List, Dict, Any

app = Flask(__name__)


def parse_machines(raw: str) -> List[str]:
    if not raw:
        return []
    separators = ["\n", ",", ";", " "]
    for sep in separators[1:]:
        raw = raw.replace(sep, "\n")
    machines = [line.strip() for line in raw.split("\n")]
    return [m for m in machines if m]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/execute", methods=["POST"])
def execute():
    payload = request.get_json(silent=True) or {}

    username = str(payload.get("username", "")).strip()
    password = str(payload.get("password", "")).strip()
    machines_raw = str(payload.get("machines", ""))
    command = str(payload.get("command", "")).strip()

    if not username or not password or not command:
        return jsonify({"error": "username, password, and command are required"}), 400

    machines = parse_machines(machines_raw)
    if not machines:
        return jsonify({"error": "At least one machine is required"}), 400

    results: List[Dict[str, Any]] = []

    for machine in machines:
        target_spec = f"{username}:{password}@{machine}"
        argv = [
            sys.executable,
            "-m",
            "impacket.examples.psexec",
            target_spec,
            command,
        ]
        try:
            completed = subprocess.run(
                argv,
                capture_output=True,
                text=True,
                timeout=300,
            )
            results.append(
                {
                    "machine": machine,
                    "returncode": completed.returncode,
                    "stdout": completed.stdout[-10000:],
                    "stderr": completed.stderr[-10000:],
                }
            )
        except subprocess.TimeoutExpired as ex:
            results.append(
                {
                    "machine": machine,
                    "returncode": None,
                    "stdout": (ex.stdout or "")[-10000:],
                    "stderr": f"Timeout after {ex.timeout} seconds",
                }
            )
        except Exception as ex:
            results.append(
                {
                    "machine": machine,
                    "returncode": None,
                    "stdout": "",
                    "stderr": f"Error: {type(ex).__name__}: {ex}",
                }
            )

    return jsonify({"results": results})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)