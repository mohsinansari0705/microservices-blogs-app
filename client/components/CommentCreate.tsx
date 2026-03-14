import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
    VBox,
    HBox,
} from 'react-native-boxes';
import { CommentList } from './CommentList';
import { colors } from './utils/Colors';
import { font, space } from './utils/Sizes';


export type CommentCreateProps = {
    postId: string;
    comments: [{ id: string, content: string, status: string }] | [];
    onCommentAdded?: () => void;
}

export function CommentCreate({ postId, comments, onCommentAdded }: CommentCreateProps) {
    const [comment, setComment] = useState<string>('');

    const onSubmit = async () => {
        try {
            if (comment !== '') {
                await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                    content: comment
                });

                setTimeout(() => {
                    if (onCommentAdded) {
                        onCommentAdded();
                    }
                }, 150);
            }
            
            setComment('');
        } catch (error) {
            console.log("Error creating comment:", error);
        }
    };


    return (
        <View style={{ backgroundColor: 'transparent', marginTop: space.md }}>
            <VBox>
                <HBox style={{ marginBottom: space.sm, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: colors.text, fontSize: font.md, fontWeight: '600' }}>Comments</Text>
                    <Text style={{ color: colors.primary, fontSize: font.sm * 1.5, fontWeight: 'bold' }}>{comments.length} REPLIES</Text>
                </HBox>

                <HBox style={{ gap: space.sm, alignItems: 'center', marginBottom: space.sm }}>
                    <TextInput 
                        placeholder="Add a comment..." 
                        onChangeText={setComment}
                        value={comment}
                        placeholderTextColor={colors.textMuted}
                        style={{
                            flex: 1,
                            fontSize: font.md,
                            color: colors.text,
                            backgroundColor: colors.surfaceDark,
                            borderWidth: 1,
                            borderRadius: space.xl,
                            borderColor: colors.border,
                            paddingVertical: space.sm,
                            paddingHorizontal: space.md
                        }} 
                    />

                    <TouchableOpacity
                        onPress={onSubmit}
                        disabled={!comment.trim()}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: comment.trim() ? colors.primary : colors.surfaceHighlight,
                            paddingHorizontal: space.md,
                            paddingVertical: space.sm,
                            borderRadius: space.xl,
                        }}
                    >
                        <Text style={{
                            color: comment.trim() ? colors.white : colors.textMuted,
                            fontSize: font.sm * 1.5,
                            fontWeight: 'bold'
                        }}>Post</Text>
                    </TouchableOpacity>
                </HBox>

                <CommentList comments={comments} />
            </VBox>
        </View>
    );
};
