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
import { useEffect, useState } from "react";
import { SelectChangeEvent } from '@mui/material';
import { TagsInput } from "@/components/TagsInput";
import { useRouter } from "next/navigation";

const StyledContainer = styled(Container)`
    margin-top: 100px;
    width: 100%;
`

const StyledForm = styled.form`
    margin: 0 auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    @media (max-width: 768px) {
      width: 100%;
    }
`

type ContentBlock = {
    type: string;
    chineseContent?: string;
    englishContent?: string;
    imageUrl?: string;
    chineseCaption?: string;
    englishCaption?: string;
}

type NewArticleProps = {
    initialData?: {
        chineseTitle: string;
        englishTitle: string;
        handle: string;
        bannerImageUrl: string;
        content: ContentBlock[];
        chineseTags: string[];
        englishTags: string[];
    };
    submitUrl: string;
}

export default function ArticleForm({ initialData, submitUrl }: NewArticleProps) {
    const [contentType, setContentType] = useState<'paragraph' | 'image'>('paragraph');
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(initialData?.content || [{ type: contentType }]);
    const [chineseTags, setChineseTags] = useState<string[]>(initialData?.chineseTags || []);
    const [englishTags, setEnglishTags] = useState<string[]>(initialData?.englishTags || []);
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setContentBlocks(initialData.content);
            setChineseTags(initialData.chineseTags);
            setEnglishTags(initialData.englishTags);
        }
    }, [initialData]);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject: { [key: string]: any } = {
            chineseTitle: formData.get('chineseTitle') as string,
            englishTitle: formData.get('englishTitle') as string,
            handle: formData.get('handle') as string,
            bannerImageUrl: formData.get('bannerImageUrl') as string,
            content: contentBlocks,
            englishTags,
            chineseTags,
            secret: process.env.NEXT_PUBLIC_ARTICLE_SECRET, 
        };
        try {
            const response = await fetch(submitUrl, {
                method: submitUrl === '/api/articles/new' ? 'POST': 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-article-secret': process.env.NEXT_PUBLIC_ARTICLE_SECRET || '',
                },
                body: JSON.stringify(formObject),
            });
            if (response.ok) {
                alert('Article submitted successfully!');
                router.push(`/article/${formObject.handle}`); 
            } else {
                alert('Failed to submit article.');
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleSubmit}>
                <InputLabel htmlFor="chineseTitle" required>Chinese Title</InputLabel>
                <Input id="chineseTitle" name="chineseTitle" defaultValue={initialData?.chineseTitle || ''} />
                <InputLabel htmlFor="englishTitle" required>English Title</InputLabel>
                <Input id="englishTitle" name="englishTitle" defaultValue={initialData?.englishTitle || ''} />
                <InputLabel htmlFor="handle" required>Handle</InputLabel>
                <Input id="handle" name="handle" defaultValue={initialData?.handle || ''} />
                <InputLabel htmlFor="bannerImageUrl" required>Banner ImageUrl</InputLabel>
                <Input id="bannerImageUrl" name="bannerImageUrl" defaultValue={initialData?.bannerImageUrl || ''} />
                {contentBlocks.map((block, index) => (
                    <div key={index}>
                        <InputLabel id={`content-type-label-${index}`} required>Type</InputLabel>
                        <Select
                            labelId={`content-type-label-${index}`}
                            style={{ width: "44%", height: "30px" }}
                            value={block.type}
                            name="type"
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
                                    name="chineseContent"
                                    defaultValue={block.chineseContent || ''}
                                    onChange={(event) => handleInputChange(index, 'chineseContent', event)}
                                />
                                <InputLabel htmlFor={`englishContent-${index}`} required>English Content</InputLabel>
                                <TextareaAutosize
                                    minRows={4}
                                    maxRows={10}
                                    style={{ width: "100%" }}
                                    id={`englishContent-${index}`}
                                    name="englishContent"
                                    defaultValue={block.englishContent || ''}
                                    onChange={(event) => handleInputChange(index, 'englishContent', event)}
                                />
                            </>
                        )}

                        {block.type === 'image' && (
                            <Stack gap={1.5}>
                                <InputLabel htmlFor={`imageUrl-${index}`} required>ImageUrl</InputLabel>
                                <Input
                                    id={`imageUrl-${index}`}
                                    name="imageUrl"
                                    style={{ width: "100%" }}
                                    defaultValue={block.imageUrl || ''}
                                    onChange={(event) => handleInputChange(index, 'imageUrl', event)}
                                />
                                <InputLabel htmlFor={`chineseCaption-${index}`} required>Chinese Caption</InputLabel>
                                <Input
                                    id={`chineseCaption-${index}`}
                                    name="chineseCaption"
                                    style={{ width: "100%" }}
                                    defaultValue={block.chineseCaption || ''}
                                    onChange={(event) => handleInputChange(index, 'chineseCaption', event)}
                                />
                                <InputLabel htmlFor={`englishCaption-${index}`} required>English Caption</InputLabel>
                                <Input
                                    id={`englishCaption-${index}`}
                                    name="englishCaption"
                                    style={{ width: "100%" }}
                                    defaultValue={block.englishCaption || ''}
                                    onChange={(event) => handleInputChange(index, 'englishCaption', event)}
                                />
                            </Stack>
                        )}
                    </div>
                ))}

                <Button color="primary" onClick={addContentBlock}>Add Content Block</Button>

                <TagsInput tags={chineseTags} setTags={setChineseTags} label="Chinese Tags" />
                <TagsInput tags={englishTags} setTags={setEnglishTags} label="English Tags" />

                {/* <InputLabel htmlFor="chineseTags" required>Chinese Tags</InputLabel>
                <Input id="chineseTags" name="chineseTags"/>
                <InputLabel htmlFor="englishTags" required>English Tags</InputLabel>
                <Input id="englishTags" name="englishTags" /> */}
                <Button type="submit">
                    Submit
                </Button>
            </StyledForm>
        </StyledContainer>
    )
}