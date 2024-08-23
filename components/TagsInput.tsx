import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextField, Chip, Box, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type TagsInputProps = {
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>;
    label: string;
}

export const TagsInput = ({ tags, setTags, label }: TagsInputProps)  => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddTag = () => {
        if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTag();
        }
    };

    return (
        <Box>
            <TextField
                label={label}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
                fullWidth
            />
            <IconButton onClick={handleAddTag}>
                <AddCircleIcon />
            </IconButton>
            <Box sx={{ marginTop: 2 }}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        sx={{ marginRight: 1, marginBottom: 1 }}
                    />
                ))}
            </Box>
        </Box>
    );
}

