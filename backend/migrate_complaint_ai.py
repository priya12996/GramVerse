import sqlite3
import os


DB_PATH = os.path.join(
    os.path.dirname(__file__),
    "gramverse.db"
)


def column_exists(cursor, table_name, column_name):

    cursor.execute(
        f"PRAGMA table_info({table_name})"
    )

    columns = cursor.fetchall()

    return any(
        column[1] == column_name
        for column in columns
    )


def add_column(cursor, column_name, column_type):

    if not column_exists(
        cursor,
        "complaints",
        column_name
    ):
        cursor.execute(
            f"""
            ALTER TABLE complaints
            ADD COLUMN {column_name} {column_type}
            """
        )

        print(f"Added column: {column_name}")

    else:
        print(f"Column already exists: {column_name}")


def main():

    if not os.path.exists(DB_PATH):
        print("Database not found:")
        print(DB_PATH)
        return

    connection = sqlite3.connect(DB_PATH)

    cursor = connection.cursor()

    print("Starting complaint AI migration...")

    add_column(
        cursor,
        "priority",
        "VARCHAR(20)"
    )

    add_column(
        cursor,
        "severity",
        "INTEGER"
    )

    add_column(
        cursor,
        "suggested_action",
        "TEXT"
    )

    add_column(
        cursor,
        "ai_reason",
        "TEXT"
    )

    connection.commit()

    connection.close()

    print()
    print("Complaint AI migration completed successfully.")


if __name__ == "__main__":
    main()