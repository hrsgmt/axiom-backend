import requests

API = "https://axiom-backend-cnkz.onrender.com"

TOKEN = "PASTE_TOKEN_HERE"

headers = {
    "Authorization": f"Bearer {TOKEN}"
}

res = requests.get(f"{API}/api/me", headers=headers)

print("Status:", res.status_code)
print("Response:", res.text)
