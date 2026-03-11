import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
    VBox
} from 'react-native-boxes';
import { colors } from '../common/utils/Colors';
import { font, space } from '../common/utils/Sizes';


export type CommentListProps = {
    comments: [{ id: string, content: string }] | [];
};

export function CommentList({ comments }: CommentListProps) {
    const renderedComments = comments.map((comment: any) => ({
        id: comment.id,
        content: comment.content
    }));

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                maxHeight: space.xxl * 2.5,
                gap: space.sm
            }}
        >
            {renderedComments.map((comment: { id: string, content: string }) =>
                <VBox key={comment.id} style={{ marginTop: space.sm }}>
                    <Text style={{
                        color: colors.white,
                        fontSize: font.md
                    }}>• {comment.content}</Text>
                </VBox>
            )}
        </ScrollView>
    );
};
