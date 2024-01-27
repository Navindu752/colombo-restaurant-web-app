import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, sideDishes, theme) {
    return {
        fontWeight:
            sideDishes.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip({ filedName, names, setSideDishes,sideDishes }) {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSideDishes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ mt: 1, width: 400 }}>
                <InputLabel id="demo-multiple-chip-label">{filedName}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={sideDishes}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) =>(    
                                <Chip key={value?.name} label={value?.name} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((item) => (
                        <MenuItem
                            key={item.name}
                            value={item}
                            style={getStyles(item.name, sideDishes, theme)}
                        >
                            {item.name} - {item.price}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}