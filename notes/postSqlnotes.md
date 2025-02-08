### **🔍 Commands to View the `Feedback` Table in PostgreSQL (Terminal)**
Since you have **PostgreSQL installed** and your database is named **`corpfeedback`**, follow these steps to view the `Feedback` table in your terminal.

---

## **✅ 1️⃣ Open PostgreSQL in the Terminal**
Run:

```sh
psql -U blake -d corpfeedback
```

This will log you into the PostgreSQL shell.

If you get an authentication error, try:

```sh
psql -U postgres -d corpfeedback
```

---

## **✅ 2️⃣ List All Tables**
To confirm that the `Feedback` table exists, run:

```sql
\dt
```

You should see output like:

```
              List of relations
 Schema |        Name        | Type  | Owner  
--------+--------------------+-------+-------
 public | Feedback           | table | blake
 public | _prisma_migrations | table | blake
(2 rows)
```

If your table name appears **with an uppercase `F`**, you must reference it correctly in queries.

---

## **✅ 3️⃣ View All Data in `Feedback`**
If your table is named **`Feedback` (uppercase F)**, use:

```sql
SELECT * FROM "Feedback";
```

If your table is named **`feedback` (lowercase f)**, use:

```sql
SELECT * FROM feedback;
```

**Note:** PostgreSQL is **case-sensitive** and treats `"Feedback"` and `feedback` as different names. Using **double quotes** ensures it matches exactly.

---

## **✅ 4️⃣ View Table Structure**
To check column names and data types:

```sql
\d "Feedback"
```

Example output:

```
               Table "public.Feedback"
   Column     |         Type          | Modifiers 
--------------+-----------------------+-----------
 id           | integer               | not null
 text         | text                   | 
 upvoteCount  | integer               | default 0
 daysAgo      | integer               | 
 company      | text                   | 
 badgeLetter  | text                   | 
 createdAt    | timestamp without time zone | default now()
Indexes:
    "Feedback_pkey" PRIMARY KEY, btree (id)
```

---

## **✅ 5️⃣ Filter Specific Data**
### **Show the Latest Feedback (Most Recent First)**
```sql
SELECT * FROM "Feedback" ORDER BY "createdAt" DESC;
```

### **Show Feedback for a Specific Company**
```sql
SELECT * FROM "Feedback" WHERE company = 'TechCorp';
```

### **Count How Many Feedback Entries Exist**
```sql
SELECT COUNT(*) FROM "Feedback";
```

---

## **✅ 6️⃣ Exit PostgreSQL**
When you’re done, **exit the PostgreSQL shell** by typing:

```sql
\q
```

---

## **🎯 Summary of Commands**
| Command | Description |
|---------|------------|
| `psql -U blake -d corpfeedback` | Connect to PostgreSQL |
| `\dt` | List all tables |
| `SELECT * FROM "Feedback";` | Show all feedback entries |
| `\d "Feedback"` | Show table structure |
| `SELECT * FROM "Feedback" ORDER BY "createdAt" DESC;` | Show latest feedback first |
| `SELECT COUNT(*) FROM "Feedback";` | Count number of entries |
| `\q` | Exit PostgreSQL |

---

### **🚀 Now You Can View Your Table!**
Try these commands and let me know if you need help! 🚀🔥