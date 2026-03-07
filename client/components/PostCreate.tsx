import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
    CardView,
    VBox,
    HBox
} from 'react-native-boxes';
import { colors } from '../common/utils/Colors';
import { font, space } from '@/common/utils/Sizes';


export type PostCreateProps = {
    onSubmit: () => void;
}

export default function PostCreate() {
    const [ title, setTitle ] = useState<string>('')
    const [ content, setContent ] = useState<string>('')

    const onSubmit = async () => {
        try {
            if (title !== '' && content !== '') {
                const response = await axios.post('http://localhost:4000/posts', {
                    title, content
                });
            }
            
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <CardView style={{
            backgroundColor: colors.lightBlue,
            paddingHorizontal: space.lg,
            paddingVertical: space.md * 0.75,
            borderRadius: space.md,
            borderWidth: 2,
            borderColor: colors.textMuted + '22'
        }}>
            <HBox style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: space.md
            }}>
                <Text style={{ color: colors.white, fontSize: font.lg }}>Create Post</Text>
            </HBox>

            <VBox style={{ gap: space.md }}>
                <VBox>
                    <Text style={{ color: colors.white, fontSize: font.md * 1.15, fontWeight: 'bold', marginBottom: space.sm }}>Title :</Text>
                    <TextInput 
                        placeholder="Enter post title..." 
                        onChangeText={setTitle}
                        value={title}
                        placeholderTextColor={colors.textMuted}
                        style={{
                            backgroundColor: colors.darkBlue,
                            fontSize: font.md * 1.1,
                            color: colors.white,
                            padding: space.sm * 1.25,
                            borderRadius: space.sm
                        }} 
                    />
                </VBox>
                <VBox>
                    <Text style={{ color: colors.white, fontSize: font.md * 1.15, fontWeight: 'bold', marginBottom: space.sm }}>Content :</Text>
                    <TextInput
                        placeholder="Enter post content..." 
                        onChangeText={setContent}
                        value={content}
                        placeholderTextColor={colors.textMuted} 
                        multiline={true}
                        style={{
                            backgroundColor: colors.darkBlue,
                            fontSize: font.md * 1.1,
                            color: colors.white,
                            padding: space.sm  * 1.25,
                            borderRadius: space.sm,
                            height: 100,
                            textAlignVertical: 'top'
                        }} 
                    />
                </VBox>
            </VBox>

            <TouchableOpacity
                onPress={onSubmit}
                style={{
                    paddingVertical: space.sm,
                    borderRadius: space.md,
                    alignItems: 'center',
                    marginTop: space.sm
                }}
            >
                <View style={{
                    borderRadius: space.sm,
                    borderColor: colors.textMuted,
                    borderWidth: 1,
                    paddingHorizontal: space.md,
                    paddingVertical: space.sm,
                    backgroundColor: colors.mediumBlue
                }}>
                    <Text style={{
                        color: colors.white,
                        fontSize: font.md,
                        fontWeight: 'bold'
                    }}>Submit</Text>
                </View>
            </TouchableOpacity>
        </CardView>
    );
};
