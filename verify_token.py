import jwt

TOKEN = "PASTE_TOKEN_HERE"
SECRET = "axiom-secret"  # replace with YOUR JWT_SECRET

try:
    decoded = jwt.decode(TOKEN, SECRET, algorithms=["HS256"])
    print("✅ TOKEN VALID")
    print(decoded)
except jwt.ExpiredSignatureError:
    print("❌ Token expired")
except jwt.InvalidTokenError as e:
    print("❌ Invalid token:", e)
