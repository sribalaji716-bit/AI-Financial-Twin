from memory.user_memory import add_user_record, get_all_records

record = {
    "name": "Sribalaji",
    "age": 20,
    "income": 50000,
    "expenses": 25000,
    "savings": 15000,
    "goal": "Buy a House"
}

# Save record
add_user_record(record)

# Read all records
history = get_all_records()

print("===== USER HISTORY =====")

for user in history:
    print(user)