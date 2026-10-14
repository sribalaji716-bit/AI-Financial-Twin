import json
import os

# Path to JSON memory file
MEMORY_FILE = os.path.join(os.path.dirname(__file__), "user_history.json")


def load_memory():
    """Load all user records from JSON file."""

    if not os.path.exists(MEMORY_FILE):
        return []

    with open(MEMORY_FILE, "r", encoding="utf-8") as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return []


def save_memory(data):
    """Save all records to JSON file."""

    with open(MEMORY_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)


def add_user_record(record):
    """Add one new user record."""

    history = load_memory()
    history.append(record)
    save_memory(history)


def get_all_records():
    """Return all stored records."""

    return load_memory()


def clear_memory():
    """Delete all saved records."""

    save_memory([])