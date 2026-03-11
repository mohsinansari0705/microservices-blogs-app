import axios from 'axios';
import { Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import {
    CardView,
    VBox,
    HBox
} from 'react-native-boxes';
import { colors } from '../common/utils/Colors';
import { font, space } from '../common/utils/Sizes';
import { CommentCreate } from './CommentCreate';


type PostListProps = {
    style?: any;
};

export default function PostList({ style }: PostListProps) {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');

        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchedPosts = Object.values(posts).map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        comments: post.comments
    }));


    return (
        <CardView style={{
            flex: 1,
            backgroundColor: colors.darkBlue,
            padding: 0,
            marginVertical: space.md,
            marginHorizontal: 0,
            ...style
        }}>
            <HBox style={{ gap: space.sm, justifyContent: 'flex-start', alignItems: 'center', paddingBottom: space.md }}>
                <Text style={{ color: colors.white, fontSize: font.lg, fontWeight: 'bold' }}>Posts</Text>
                <Text style={{ color: colors.textMuted, fontSize: font.md }}>{fetchedPosts.length} posts</Text>
            </HBox>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: space.lg, paddingBottom: space.md }}
            >
                {fetchedPosts.map((post: { id: string, title: string, content: string, comments: [any] }) =>
                    <VBox
                        key={post.id}
                        style={{
                            backgroundColor: colors.lightBlue,
                            borderRadius: space.sm,
                            paddingHorizontal: space.md,
                            paddingTop: space.md * 1.15,
                            paddingBottom: space.sm
                        }}
                    >
                        <VBox style={{ gap: space.sm, paddingBottom: space.sm / 2 }}>
                            <Text style={{
                                color: colors.white,
                                fontSize: font.md * 1.2,
                                fontWeight: '400'
                            }}>
                                {post.title}
                            </Text>
                            <Text style={{
                                color: colors.textMuted,
                                fontSize: font.md * 1.05
                            }}>
                                {post.content}
                            </Text>
                        </VBox>
    
                        <CommentCreate postId={post.id} comments={post.comments} />
                    </VBox>
                )}
            </ScrollView>
        </CardView>
    );
};
