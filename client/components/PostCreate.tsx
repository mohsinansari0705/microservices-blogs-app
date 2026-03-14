import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
    CardView,
    VBox,
    HBox
} from 'react-native-boxes';
import { colors } from './utils/Colors';
import { font, space } from './utils/Sizes';


type PostCreateProps = {
    style?: any;
    onPostCreated?: () => void;
};

export default function PostCreate({ style, onPostCreated }: PostCreateProps) {
    const [ title, setTitle ] = useState<string>('')
    const [ content, setContent ] = useState<string>('')

    const onSubmit = async () => {
        try {
            if (title !== '' && content !== '') {
                await axios.post('http://localhost:4000/posts', {
                    title: title,
                    content: content
                });

                setTimeout(() => {
                    if (onPostCreated) {
                        onPostCreated();
                    }
                }, 150);
            }
            
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <CardView style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderRadius: space.md,
            borderColor: colors.border,
            margin: 0,
            marginVertical: space.lg,
            paddingTop: space.md,
            paddingBottom: space.md,
            paddingHorizontal: space.md * 1.15,
            ...style
        }}>
            <HBox style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: space.md
            }}>
                <Text style={{ color: colors.text, fontSize: font.lg, fontWeight: 'bold' }}>Create New Post</Text>
            </HBox>

            <VBox style={{ gap: space.md }}>
                <VBox style={{ gap: space.sm / 2 }}>
                    <Text style={{ color: colors.textMuted, fontSize: font.sm * 1.5, fontWeight: '600', textTransform: 'uppercase' }}>Title</Text>
                    <TextInput 
                        placeholder="Enter post title..." 
                        onChangeText={setTitle}
                        value={title}
                        placeholderTextColor={colors.textMuted}
                        style={{
                            fontSize: font.md,
                            color: colors.text,
                            backgroundColor: colors.surfaceDark,
                            borderWidth: 1,
                            borderRadius: space.sm,
                            borderColor: colors.border,
                            padding: space.md
                        }} 
                    />
                </VBox>
                <VBox style={{ gap: space.sm / 2 }}>
                    <Text style={{ color: colors.textMuted, fontSize: font.sm * 1.5, fontWeight: '600', textTransform: 'uppercase' }}>Content</Text>
                    <TextInput
                        placeholder="What's on your mind?" 
                        onChangeText={setContent}
                        value={content}
                        placeholderTextColor={colors.textMuted} 
                        multiline={true}
                        style={{
                            height: 100,
                            fontSize: font.md,
                            color: colors.text,
                            backgroundColor: colors.surfaceDark,
                            borderRadius: space.sm,
                            borderWidth: 1,
                            borderColor: colors.border,
                            textAlignVertical: 'top',
                            padding: space.md
                        }} 
                    />
                </VBox>

                <TouchableOpacity
                    onPress={onSubmit}
                    style={{
                        borderRadius: space.md,
                        alignItems: 'center',
                        marginTop: space.sm
                    }}
                >
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        borderRadius: space.sm,
                        paddingVertical: space.md,
                        backgroundColor: colors.primary
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: font.md,
                            fontWeight: 'bold',
                            letterSpacing: 0.5
                        }}>Publish Post</Text>
                    </View>
                </TouchableOpacity>
            </VBox>
        </CardView>
    );
};
