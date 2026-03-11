import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
    VBox
} from 'react-native-boxes';
import { colors } from '../common/utils/Colors';
import { font, space } from '../common/utils/Sizes';


export type CommentListProps = {
    comments: [{ id: string, content: string, status: string }] | [];
};

export function CommentList({ comments }: CommentListProps) {
    const validateStatus = (content: string, status: string) => {
        let updatedContent: string;

        if (status === 'approved') {
            content = content;
        }
        if (status === 'pending') {
            content = "This comment is awaiting moderation.";
        }
        if (status === 'rejected') {
            content = "This comment has been rejected!";
        }

        return content
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                maxHeight: space.xxl * 2.5,
                gap: space.sm
            }}
        >
            {comments.map((comment: { id: string, content: string, status: string }) =>
                <VBox key={comment.id} style={{ marginTop: space.sm }}>
                    <Text style={{
                        color: colors.white,
                        fontSize: font.md
                    }}>• {validateStatus(comment.content, comment.status)}</Text>
                </VBox>
            )}
        </ScrollView>
    );
};
