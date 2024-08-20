"use client"

import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import styled from "@emotion/styled";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button } from '@mui/base/Button';
import { useState } from "react";

const StyledContainer = styled(Container)`
    margin-top: 100px;
    width: 50%;

`

export default function NewArticle() {
    const [contentType, setContentType] = useState('paragraph');
    const [contentBlocks, setContentBlocks] = useState([{ type: contentType }]);

    const handleTypeChange = (index, event) => {
        const newContentBlocks = [...contentBlocks];
        newContentBlocks[index].type = event.target.value;
        setContentBlocks(newContentBlocks);
    };

    const handleInputChange = (index, key, event) => {
        const newContentBlocks = [...contentBlocks];
        newContentBlocks[index][key] = event.target.value;
        setContentBlocks(newContentBlocks);
    };

    const addContentBlock = () => {
        setContentBlocks([...contentBlocks, { type: 'paragraph' }]);
    };

    return (
        <StyledContainer>
            <Stack gap={2}>
                <FormControl>
                    <InputLabel htmlFor="chineseTitle" required>Chinese Title</InputLabel>
                    <Input id="chineseTitle" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="englishTitle" required>English Title</InputLabel>
                    <Input id="englishTitle" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="bannerImageUrl" required>Banner ImageUrl</InputLabel>
                    <Input id="bannerImageUrl" />
                </FormControl>

                {contentBlocks.map((block, index) => (
                    <div key={index}>
                        <FormControl>
                            <InputLabel id={`content-type-label-${index}`} required>Type</InputLabel>
                            <Select
                                labelId={`content-type-label-${index}`}
                                value={block.type}
                                onChange={(event) => handleTypeChange(index, event)}
                            >
                                <MenuItem value="paragraph">Paragraph</MenuItem>
                                <MenuItem value="image">Image</MenuItem>
                            </Select>
                        </FormControl>

                        {block.type === 'paragraph' && (
                            <>
                                <FormControl>
                                    <InputLabel htmlFor={`chineseContent-${index}`} required>Chinese Content</InputLabel>
                                    <TextareaAutosize
                                        minRows={4}
                                        maxRows={10}
                                        id={`chineseContent-${index}`}
                                        onChange={(event) => handleInputChange(index, 'chineseContent', event)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor={`englishContent-${index}`} required>English Content</InputLabel>
                                    <TextareaAutosize
                                        minRows={4}
                                        maxRows={10}
                                        id={`englishContent-${index}`}
                                        onChange={(event) => handleInputChange(index, 'englishContent', event)}
                                    />
                                </FormControl>
                            </>
                        )}

                        {block.type === 'image' && (
                            <>
                                <FormControl>
                                    <InputLabel htmlFor={`imageUrl-${index}`} required>ImageUrl</InputLabel>
                                    <Input
                                        id={`imageUrl-${index}`}
                                        onChange={(event) => handleInputChange(index, 'imageUrl', event)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor={`chineseCaption-${index}`} required>Chinese Caption</InputLabel>
                                    <Input
                                        id={`chineseCaption-${index}`}
                                        onChange={(event) => handleInputChange(index, 'chineseCaption', event)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor={`englishCaption-${index}`} required>English Caption</InputLabel>
                                    <Input
                                        id={`englishCaption-${index}`}
                                        onChange={(event) => handleInputChange(index, 'englishCaption', event)}
                                    />
                                </FormControl>
                            </>
                        )}
                    </div>
                ))}

                <Button variant="outlined" onClick={addContentBlock}>Add Content Block</Button>

                <FormControl>
                    <InputLabel htmlFor="chineseTag" required>Chinese Tag</InputLabel>
                    <Input id="chineseTag" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="englishTag" required>English Tag</InputLabel>
                    <Input id="englishTag" />
                </FormControl>
            </Stack>
        </StyledContainer>
    )
}