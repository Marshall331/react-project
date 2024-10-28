export function Input({ placeholder, value, onChange }) {
    return <div>
        <input
            type="text"
            className="form-control me-sm-2"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}