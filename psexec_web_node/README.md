# PsExec Web

A minimal web UI to run impacket's `psexec` sequentially across multiple machines.

## Requirements
- `python3` available on the server
- `impacket` installed so that `python3 -m impacket.examples.psexec` works
  - Install via pip: `pip3 install --user impacket` (or use a venv)
  - Or via OS packages if available

## Run
```
node server.js
```
Then open `http://localhost:8080`.

## Usage
- Provide username, password, list of machines (one per line or comma-separated), and the command.
- Click Execute. The server will run psexec sequentially for each machine and show output.

## Notes
- Credentials are sent to the server. Use only over a trusted network or behind HTTPS/reverse proxy.
- For domain accounts, pass `DOMAIN/user` as the username.
- Make sure target machines allow SMB (TCP 445) and the account has admin rights.
- If you prefer Sysinternals `PsExec.exe` on Windows, adapt the server to spawn that binary instead.