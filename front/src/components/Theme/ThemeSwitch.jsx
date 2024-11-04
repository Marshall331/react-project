import { FormControlLabel } from "@mui/material";
import Switch from '@mui/material/Switch';
import { useTheme } from "@/hooks/useTheme";

export default function ThemeSwitch() {

    const { darkMode, toggleTheme } = useTheme()

    return (
        <FormControlLabel
        sx={{
          display: 'flex',
          justifyContent: 'end',
          width: 'max-content',
          color: (theme) => theme.palette.text.primary,
          marginLeft: 'auto',
        }}
        label="Mode sombre"
        control={<Switch
          checked={darkMode}
          onChange={toggleTheme} />}
      />
    );
}