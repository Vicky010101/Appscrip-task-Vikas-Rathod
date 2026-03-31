import { useState, useRef, useEffect } from "react";
import styles from "../styles/SortDropdown.module.css";

const SORT_OPTIONS = [
    { value: "default", label: "Recommended" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Popular" },
    { value: "price-desc", label: "Price : High to Low" },
    { value: "price-asc", label: "Price : Low to High" },
];

export default function SortDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const active = SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0];

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const select = (val) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className={styles.wrap} ref={ref}>
            <button
                className={styles.trigger}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={"Sort by: " + active.label}
            >
                <span className={styles.triggerLabel}>{active.label.toUpperCase()}</span>
                <svg
                    className={`${styles.chevron} ${open ? styles.chevronUp : ""}`}
                    width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    aria-hidden="true"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <ul className={styles.menu} role="listbox" aria-label="Sort options">
                    {SORT_OPTIONS.map((opt) => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={opt.value === value}
                            className={`${styles.option} ${opt.value === value ? styles.optionActive : ""}`}
                            onClick={() => select(opt.value)}
                        >
                            <span className={styles.check} aria-hidden="true">
                                {opt.value === value ? "✓" : ""}
                            </span>
                            {opt.label.toUpperCase()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
