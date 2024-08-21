"use client"

import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import styled from "@emotion/styled";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button } from '@mui/base/Button';
import { useState } from "react";
import { SelectChangeEvent } from '@mui/material';

const StyledContainer = styled(Container)`
    margin-top: 100px;
    width: 100%;
`

const StyledForm = styled.form`
    margin: 0 auto;
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

interface ContentBlock {
    type: string;
    chineseContent?: string;
    englishContent?: string;
    imageUrl?: string;
    chineseCaption?: string;
    englishCaption?: string;
}

export default function NewArticle() {
    const [contentType, setContentType] = useState<'paragraph' | 'image'>('paragraph');
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([{ type: contentType }]);

    const handleTypeChange = (index: number, event: SelectChangeEvent<string>) => {
        const newContentBlocks = [...contentBlocks];
        newContentBlocks[index].type = event.target.value;
        setContentBlocks(newContentBlocks);
    };

    const handleInputChange = (index: number, key: keyof ContentBlock, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newContentBlocks = [...contentBlocks];
        newContentBlocks[index][key] = event.target.value;
        setContentBlocks(newContentBlocks);
    };

    const addContentBlock = () => {
        setContentBlocks([...contentBlocks, { type: 'paragraph' }]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        alert(new URLSearchParams(formData as any).toString());
    };

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleSubmit}>
                <InputLabel htmlFor="chineseTitle" required>Chinese Title</InputLabel>
                <Input id="chineseTitle" />
                <InputLabel htmlFor="englishTitle" required>English Title</InputLabel>
                <Input id="englishTitle" />
                <InputLabel htmlFor="bannerImageUrl" required>Banner ImageUrl</InputLabel>
                <Input id="bannerImageUrl" />
                {contentBlocks.map((block, index) => (
                    <div key={index}>
                        <InputLabel id={`content-type-label-${index}`} required>Type</InputLabel>
                        <Select
                            labelId={`content-type-label-${index}`}
                            style={{ width: "30%", height: "30px" }}
                            value={block.type}
                            onChange={(event) => handleTypeChange(index, event)}
                        >
                            <MenuItem value="paragraph">Paragraph</MenuItem>
                            <MenuItem value="image">Image</MenuItem>
                        </Select>

                        {block.type === 'paragraph' && (
                            <>
                                <InputLabel htmlFor={`chineseContent-${index}`} required>Chinese Content</InputLabel>
                                <TextareaAutosize
                                    minRows={4}
                                    maxRows={10}
                                    style={{ width: "100%" }}
                                    id={`chineseContent-${index}`}
                                    onChange={(event) => handleInputChange(index, 'chineseContent', event)}
                                />
                                <InputLabel htmlFor={`englishContent-${index}`} required>English Content</InputLabel>
                                <TextareaAutosize
                                    minRows={4}
                                    maxRows={10}
                                    style={{ width: "100%" }}
                                    id={`englishContent-${index}`}
                                    onChange={(event) => handleInputChange(index, 'englishContent', event)}
                                />
                            </>
                        )}

                        {block.type === 'image' && (
                            <Stack gap={1.5}>
                                <InputLabel htmlFor={`imageUrl-${index}`} required>ImageUrl</InputLabel>
                                <Input
                                    id={`imageUrl-${index}`}
                                    style={{ width: "100%" }}
                                    onChange={(event) => handleInputChange(index, 'imageUrl', event)}
                                />
                                <InputLabel htmlFor={`chineseCaption-${index}`} required>Chinese Caption</InputLabel>
                                <Input
                                    id={`chineseCaption-${index}`}
                                    style={{ width: "100%" }}
                                    onChange={(event) => handleInputChange(index, 'chineseCaption', event)}
                                />
                                <InputLabel htmlFor={`englishCaption-${index}`} required>English Caption</InputLabel>
                                <Input
                                    id={`englishCaption-${index}`}
                                    style={{ width: "100%" }}
                                    onChange={(event) => handleInputChange(index, 'englishCaption', event)}
                                />
                            </Stack>
                        )}
                    </div>
                ))}

                <Button color="primary" onClick={addContentBlock}>Add Content Block</Button>

                <InputLabel htmlFor="chineseTag" required>Chinese Tag</InputLabel>
                <Input id="chineseTag" />
                <InputLabel htmlFor="englishTag" required>English Tag</InputLabel>
                <Input id="englishTag" />
                <Button type="submit">
                    Submit
                </Button>
            </StyledForm>
        </StyledContainer>
    )
}