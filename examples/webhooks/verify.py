"""Verify a Synapse alert before trusting it (needs the RAW request body)."""
import hashlib
import hmac


def verify_synapse(raw_body: bytes, signature_header: str, secret: str) -> bool:
    want = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(want, signature_header or "")
