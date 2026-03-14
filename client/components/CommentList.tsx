import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
    VBox
} from 'react-native-boxes';
import { colors } from './utils/Colors';
import { font, space } from './utils/Sizes';


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
            nestedScrollEnabled={true}
            style={{ maxHeight: space.xxl * 3 }}
            contentContainerStyle={{
                gap: space.sm,
                paddingVertical: space.sm * 0.75
            }}
        >
            {comments.map((comment: { id: string, content: string, status: string }) => {
                const isRejected = comment.status === 'rejected';
                const isPending = comment.status === 'pending';
                const statusColor = isRejected ? colors.danger : isPending ? colors.warning : colors.success;
                
                return (
                    <VBox key={comment.id} style={{
                        gap: space.sm,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        backgroundColor: colors.surfaceHighlight,
                        paddingHorizontal: space.md,
                        paddingVertical: space.sm,
                        borderRadius: space.md
                    }}>
                        <View style={{
                            width: 8,
                            height: 8,
                            marginTop: 6,
                            borderRadius: 4,
                            backgroundColor: statusColor
                        }} />
                        <Text style={{
                            flex: 1,
                            fontSize: font.md,
                            color: isRejected ? colors.textMuted : colors.text,
                            fontStyle: isPending || isRejected ? 'italic' : 'normal'
                        }}>{validateStatus(comment.content, comment.status)}</Text>
                    </VBox>
                );
            })}
        </ScrollView>
    );
};
