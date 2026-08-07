#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator for modules 9-15 of the frontend interview curriculum.
Follows the same 20-section template as modules 1-8, and additionally
inserts an un-numbered **## Quick Recap** block (per task requirements so
both "Quick Recap" and "Summary" always appear) between section 17
(Summary) and section 18 (Revision Notes).
"""
import os

BASE = r"H:\himtech\Learning-interview"

SECTION_HEADERS = [
    "1. Definition",
    "2. Why do we need it?",
    "3. Internal Working",
    "4. Step-by-Step Execution",
    "5. Syntax",
    "6. Examples (Easy \u2192 Advanced)",
    "7. Visual Diagram (ASCII)",
    "8. Real-world Example",
    "9. Angular Use Case",
    "10. Common Mistakes",
    "11. Edge Cases",
    "12. Performance Considerations",
    "13. Time & Space Complexity",
    "14. Interview Questions",
    "15. Follow-up Questions",
    "16. Production Best Practices",
    "17. Summary",
    "18. Revision Notes",
    "19. Practice Questions",
    "20. References",
]

# dirname -> "Next Module/First File.md"  (for last file of module banner)
NEXT_MODULE = {
    "09 Angular Core":          "10 Angular Advanced/001 - Reactive Forms.md",
    "10 Angular Advanced":      "11 Angular Performance/001 - Change Detection Strategy.md",
    "11 Angular Performance":   "12 Machine Coding/001 - Autocomplete Search.md",
    "12 Machine Coding":        "13 Frontend System Design/001 - Scalable Frontend Architecture.md",
    "13 Frontend System Design":"14 Testing/001 - Testing Pyramid.md",
    "14 Testing":               "15 Interview Questions/01 - JavaScript Interview Questions.md",
    "15 Interview Questions":   None,
}

ALL_MODULES = []  # list of (dirname, [(title, sections_dict), ...])


def add_module(dirname, topics):
    ALL_MODULES.append((dirname, topics))


def render_topic(title, sections, next_file):
    parts = ["# " + title, ""]
    for header in SECTION_HEADERS:
        body = sections.get(header, "").strip()
        parts.append("## " + header)
        parts.append(body)
        parts.append("")
        if header == "17. Summary":
            parts.append("## Quick Recap")
            parts.append(sections.get("Quick Recap", "").strip())
            parts.append("")
    parts.append("### Next File")
    parts.append("**" + next_file + "**")
    parts.append("")
    return "\n".join(parts)


def load_data_modules():
    """Import m09..m15 data files (each exposes DATA = [(dirname, topics)])."""
    import importlib
    for name in ["m09", "m10", "m11", "m12", "m13", "m14", "m15"]:
        try:
            mod = importlib.import_module(name)
            ALL_MODULES.extend(mod.DATA)
        except ImportError:
            pass


def main():
    load_data_modules()
    total = 0
    for cur_dir, topics in ALL_MODULES:
        # sanity: skip empty modules
        if not topics:
            continue
        dirpath = os.path.join(BASE, cur_dir)
        os.makedirs(dirpath, exist_ok=True)
        files = [f"{i:03d} - {t[0]}.md" for i, t in enumerate(topics, 1)]
        nxt_mod = NEXT_MODULE.get(cur_dir)
        for i, (t, fname) in enumerate(zip(topics, files)):
            next_file = files[i + 1] if i + 1 < len(files) else (nxt_mod or "index.html")
            md = render_topic(t[0], t[1], next_file)
            # Banner only on the LAST file of the module.
            if i == len(files) - 1 and nxt_mod:
                md += "\n" + ("\n---\n\n"
                              "\U0001F4DD **Module complete!** (" + str(len(files)) +
                              " files generated)  \nStarting the next topic next...")
            path = os.path.join(dirpath, fname)
            with open(path, "w", encoding="utf-8") as f:
                f.write(md)
            total += 1
    print(f"Generated {total} files across {len(ALL_MODULES)} modules.")


if __name__ == "__main__":
    main()
