"ues client"

import { useThemeContext } from '@/context/ThemeContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Dispatch, SetStateAction } from 'react';

interface CustomThemeProps {
    customTheme: 'dark' | 'light';
}

const MaterialUISwitch = styled(Switch, {
    shouldForwardProp: (prop) => prop !== 'customTheme'
})<CustomThemeProps>(({ customTheme }) => ({
    width: 48,
    height: 24,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('/english_icon.svg')`,
                filter: customTheme === 'dark' ? 'none' : 'invert(1)', //
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#8796A5',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: customTheme === 'dark' ? '#fff' : '#000',
        width: 20,
        height: 20,
        boxShadow: 'none',
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('/chinese_icon.svg')`,
            filter: customTheme === 'dark' ? 'none' : 'invert(1)',
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: customTheme === 'dark' ? '#8796A5' : '#aab4be',
    },
}));

type LangSwitchProps = {
    setLang: Dispatch<SetStateAction<"EN" | "CH">>;
    lang: "EN" | "CH";
}

export default function LangSwitch({ lang, setLang }: LangSwitchProps) {
    const { theme, setTheme } = useThemeContext();

    function handleChange(event: React.SyntheticEvent<Element, Event>, checked: boolean) {
        setLang(checked ? "EN" : "CH");
    }

    return (
        <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} customTheme={theme} />}
            sx={{ marginRight: -2 }}
            label=""
            checked={lang === "EN"}
            onChange={handleChange}
        />
    )
}