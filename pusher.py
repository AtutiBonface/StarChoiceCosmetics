import sys
import subprocess

commit_message = "Auto commit" if len(sys.argv) < 2 else " ".join(sys.argv[1:])

commands = [
    "git add .",
    f'git commit -m "{commit_message}"',
    "git push origin main"  
]

for command in commands:
    process = subprocess.run(command, shell=True, capture_output=True, text=True)
    if process.returncode == 0:
        print(f"✅ {command} imefanya poa")
    else:
        print(f"❌ Error in: {command}")
        print(process.stderr)
        break  # 