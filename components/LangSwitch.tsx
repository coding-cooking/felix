"ues client"

import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Dispatch, SetStateAction } from 'react';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
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
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#aab4be',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#8796A5',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 20,
        height: 20,
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
        },
        ...theme.applyStyles('dark', {
            backgroundColor: '#003892',
        }),
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
        ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
        }),
    },
}));

type LangSwitchProps = {
    setLang: Dispatch<SetStateAction<"EN" | "CH">>;
    lang: "EN" | "CH";
}

export default function LangSwitch({ lang, setLang }: LangSwitchProps) {
    function handleChange(event: React.SyntheticEvent<Element, Event>, checked: boolean) {
        setLang(checked ? "EN" : "CH");
    }

    return (
        <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} />}
            sx={{ marginRight: -2 }}
            label=""
            checked={lang === "EN"}
            onChange={handleChange}
        />
    )
}