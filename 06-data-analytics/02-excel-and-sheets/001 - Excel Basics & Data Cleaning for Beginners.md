# Excel Basics & Data Cleaning for Beginners

> **Difficulty:** ⭐☆☆☆☆ (Absolute Beginner)
> **Goal:** Learn how Data Analysts use Microsoft Excel / Google Sheets to clean dirty datasets in minutes.

---

# 💡 Excel Analyst Ke Liye Kyun Zaruri Hai?

Duniya ki **90% companies** aaj bhi primary data analysis aur reporting ke liye Excel use karti hain!

Jab aapko kisi system se data milta hai, to usme mistakes hoti hain:
- Extra spaces hote hain (`"  Rahul  "`)
- Same customer ki multiple entries hoti hain (Duplicates)
- Numbers text format me hote hain
- Lowercase/Uppercase mix hota hai (`rahul`, `RAHUL`)

In mistakes ko clean karne ke process ko **Data Cleaning / Data Wrangling** kehte hain.

---

# 🛠️ Top 5 Excel Data Cleaning Tricks

### 1. Remove Duplicates (Ek Click Me Duplicate Hatao)
- **Problem:** Ek hi customer ne 2 baar enter ho gaya hai.
- **Solution:** Select Table → Go to **Data** tab → Click **Remove Duplicates** → Select columns (e.g. `Customer_ID`).

---

### 2. TRIM Function (Extra Spaces Cleaning)
- **Problem:** Customer name me accidental spaces hain: `"  Amit Sharma "`
- **Formula:** `=TRIM(A2)`
- **Result:** `"Amit Sharma"` (Pehle aur baad ke faltu space hat jayenge).

---

### 3. PROPER / UPPER / LOWER Functions (Case Formatting)
- **Problem:** Names mixed format me hain: `"aMiT sHaRmA"`
- **Formula:** `=PROPER(A2)` → Output: `"Amit Sharma"`
- **Formula:** `=UPPER(A2)` → Output: `"AMIT SHARMA"`
- **Formula:** `=LOWER(A2)` → Output: `"amit sharma"`

---

### 4. Text to Columns (Full Name Ko First Name & Last Name Me Todna)
- **Problem:** Single column me `"Amit Sharma"` likha hai, aapko First Name aur Last Name alag chahiye.
- **Steps:**
  1. Column Select karo.
  2. **Data Tab** → **Text to Columns**.
  3. **Delimited** choose karo → Space tick karo → Finish.

---

### 5. Flash Fill (`Ctrl + E`) - Magic Shortcut ⚡
- Excel aapka pattern automatic samajhta hai!
- Example: Column A me `"Amit Sharma"` hai. Column B me aap type karo `"Amit"` aur Keyboard par dabao **`Ctrl + E`**. Excel saare rows ka First Name automatic fill kar dega!

---

# 📊 Real-World Hands-on Dataset Example

Look at this dirty raw customer table:

| Row | A (Dirty Customer Name) | B (Clean Name Formula `=PROPER(TRIM(A2))`) |
|---|---|---|
| 2 | `"  rahul SHARMA "` | `Rahul Sharma` |
| 3 | `"PRIYA KAPOOR  "` | `Priya Kapoor` |
| 4 | `"  VIKAS verma "` | `Vikas Verma` |

---

# 🧠 Interactive Quiz & Self-Test

### Question 1
**Agar Cell A2 me `"  Data Analytics  "` text hai, to kaun sa formula spaces ko remove karke `"Data Analytics"` banayega?**
- A) `=CLEAN(A2)`
- B) `=TRIM(A2)`
- C) `=REMOVE(A2)`
- D) `=SPACE(A2)`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **B) `=TRIM(A2)`**

**Explanation:** Excel me `TRIM()` function text ke aage aur peeche ke extra spaces ko clean karta hai, jabki words ke beech me single space rehne deta hai.
</details>

---

### Question 2
**Excel me Flash Fill trigger karne ke liye kaun sa keyboard shortcut use hota hai?**
- A) `Ctrl + C`
- B) `Ctrl + Z`
- C) `Ctrl + E`
- D) `Alt + F4`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **C) `Ctrl + E`**

**Explanation:** `Ctrl + E` Flash Fill shortcut hai jo aapke pattern ke basis par intelligent auto-fill kar deta hai.
</details>

---

### Question 3
**Text `"john doe"` ko `"John Doe"` me convert karne ke liye kaun sa formula correct hai?**
- A) `=UPPER(A2)`
- B) `=LOWER(A2)`
- C) `=PROPER(A2)`
- D) `=TEXT(A2)`

<details>
<summary>👉 Click to Reveal Answer & Explanation</summary>

**Correct Answer:** **C) `=PROPER(A2)`**

**Explanation:** `PROPER()` function har word ke first letter ko Capital (Title Case) bana deta hai.
</details>

---

# 🚀 2-Minute Revision Card

- **TRIM(cell):** Extra leading/trailing spaces delete karta hai.
- **PROPER(cell):** First letter capital karta hai (`amit` → `Amit`).
- **Remove Duplicates:** Data Tab → Remove Duplicates.
- **Flash Fill:** `Ctrl + E` (Pattern auto-detect shortcut).
- **Text to Columns:** Single column Text ko multiple columns me split karne ke liye.
