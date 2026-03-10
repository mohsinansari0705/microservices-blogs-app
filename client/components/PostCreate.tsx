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


type PostCreateProps = {
    style?: any;
};

export default function PostCreate({ style }: PostCreateProps) {
    const [ title, setTitle ] = useState<string>('')
    const [ content, setContent ] = useState<string>('')

    const onSubmit = async () => {
        try {
            if (title !== '' && content !== '') {
                await axios.post('http://localhost:4000/posts', {
                    title: title,
                    content: content
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
            flex: 1,
            backgroundColor: colors.lightBlue,
            borderWidth: 2,
            borderRadius: space.md,
            borderColor: colors.textMuted + '22',
            paddingHorizontal: space.md,
            marginVertical: space.lg,
            paddingTop: space.sm * 1,
            paddingBottom: 0,
            margin: 0,
            ...style
        }}>
            <HBox style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', fontSize: font.lg * 0.9, fontWeight: 'bold' }}>Create Post</Text>
            </HBox>

            <VBox style={{ flex: 1, justifyContent: 'space-evenly' }}>
                <VBox style={{ gap: space.sm }}>
                    <Text style={{ color: colors.white, fontSize: font.md * 1.1, fontWeight: 'bold' }}>Title :</Text>
                    <TextInput 
                        placeholder="Enter post title..." 
                        onChangeText={setTitle}
                        value={title}
                        placeholderTextColor={colors.textMuted}
                        style={{
                            backgroundColor: colors.darkBlue,
                            fontSize: font.md,
                            color: colors.white,
                            padding: space.sm * 1.35,
                            borderRadius: space.sm
                        }} 
                    />
                </VBox>
                <VBox style={{ gap: space.sm }}>
                    <Text style={{ color: colors.white, fontSize: font.md * 1.1, fontWeight: 'bold' }}>Content :</Text>
                    <TextInput
                        placeholder="Enter post content..." 
                        onChangeText={setContent}
                        value={content}
                        placeholderTextColor={colors.textMuted} 
                        multiline={true}
                        style={{
                            backgroundColor: colors.darkBlue,
                            fontSize: font.md,
                            color: colors.white,
                            padding: space.sm  * 1.35,
                            borderRadius: space.sm,
                            height: 100,
                            textAlignVertical: 'top'
                        }} 
                    />
                </VBox>

                <TouchableOpacity
                    onPress={onSubmit}
                    style={{
                        borderRadius: space.md,
                        alignItems: 'center'
                    }}
                >
                    <View style={{
                        borderWidth: 1,
                        borderRadius: space.sm,
                        borderColor: colors.textMuted,
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
            </VBox>
        </CardView>
    );
};
