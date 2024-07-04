import os

# Initialize ip_address
ip_address = ""

# Execute ipconfig and extract the IPv4 address
ipconfig_output = os.popen("ipconfig").read()
ip_lines = ipconfig_output.splitlines()
for line in ip_lines:
    if "IPv4 Address" in line:
        ip_address = line.split(":")[1].strip()

# Read and update .env file
env_file_path = "./frontend/.env"
with open(env_file_path, "r") as env_file:
    env_lines = env_file.readlines()

for i, line in enumerate(env_lines):
    if line.startswith("NEXT_PUBLIC_API_URL"):
        env_lines[i] = f'NEXT_PUBLIC_API_URL=http://{ip_address}:5173\n'

with open(env_file_path, "w") as env_file:
    env_file.writelines(env_lines)

print(f"Base URL updated to http://{ip_address}:5173")
