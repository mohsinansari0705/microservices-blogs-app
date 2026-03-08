import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import {
    VBox
} from 'react-native-boxes';
import { colors } from '../common/utils/Colors';
import { font, space } from '../common/utils/Sizes';


export type CommentListProps = {
    postId: string;
    onCommentCount?: (count: number) => void;
};

export function CommentList({ postId, onCommentCount }: CommentListProps) {
    const [comments, setComments] = useState<string[]>([]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

            if (onCommentCount) {
                onCommentCount(res.data.length);
            }

            setComments(res.data);
        } catch (error) {
            console.log("Error fetching Comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = comments.map((comment: any) => ({
        id: comment.id,
        comment: comment.comment
    }));

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                maxHeight: space.xxl * 2.5,
                flexDirection: 'column',
                gap: space.sm
            }}
        >
            {renderedComments.map((comment: { id: string, comment: string }) =>
                <VBox key={comment.id} style={{ marginTop: space.sm }}>
                    <Text style={{
                        color: colors.white,
                        fontSize: font.md
                    }}>• {comment.comment}</Text>
                </VBox>
            )}
        </ScrollView>
    );
};
