import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
    CardView,
    VBox,
    HBox,
} from 'react-native-boxes';
import { CommentList } from './CommentList';
import { colors } from '../common/utils/Colors';
import { font, space } from '../common/utils/Sizes';


export type CommentCreateProps = {
    postId: string;
    comments: [{ id: string, content: string }] | [];
}

export function CommentCreate({ postId, comments }: CommentCreateProps) {
    const [comment, setComment] = useState<string>('');

    const onSubmit = async () => {
        try {
            if (comment !== '') {
                await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                    content: comment
                });
            }
            
            setComment('');
        } catch (error) {
            console.log("Error creating comment:", error);
        }
    };


    return (
        <CardView
            style={{
                backgroundColor: colors.darkBlue,
                marginHorizontal: 0
            }}
        >
            <VBox>
                <HBox style={{ marginBottom: space.md, alignItems: 'center', gap: space.sm * 1.5 }}>
                    <Text style={{ color: colors.white, fontSize: font.md * 1.15, fontWeight: 'bold' }}>Comments</Text>
                    <Text style={{ color: colors.textMuted, fontSize: font.md }}>{comments.length} comments</Text>
                </HBox>
                <TextInput 
                    placeholder="new comment..." 
                    onChangeText={setComment}
                    value={comment}
                    placeholderTextColor={colors.textMuted}
                    style={{
                        backgroundColor: colors.lightBlue,
                        fontSize: font.md,
                        color: colors.white,
                        padding: space.sm * 1.25,
                        borderRadius: space.sm
                    }} 
                />

                <TouchableOpacity
                    onPress={onSubmit}
                    style={{
                        paddingVertical: space.sm,
                        borderRadius: space.md,
                        alignItems: 'flex-start',
                        marginTop: space.sm / 2
                    }}
                >
                    <View style={{
                        borderWidth: 1,
                        borderRadius: space.sm,
                        borderColor: colors.textMuted,
                        paddingHorizontal: space.sm * 1.5,
                        paddingVertical: space.sm / 2,
                        backgroundColor: colors.mediumBlue
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: font.md,
                            fontWeight: 'bold'
                        }}>Comment</Text>
                    </View>
                </TouchableOpacity>

                <CommentList comments={comments} />
            </VBox>
        </CardView>
    );
};
