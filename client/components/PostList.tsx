import axios from 'axios';
import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import {
    VBox,
    HBox
} from 'react-native-boxes';
import { colors } from './utils/Colors';
import { font, space } from './utils/Sizes';
import { CommentCreate } from './CommentCreate';


type PostListProps = {
    style?: any;
    refreshKey?: number;
};

export default function PostList({ style, refreshKey }: PostListProps) {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');

        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, [refreshKey]);

    const fetchedPosts = Object.values(posts).map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        comments: post.comments
    }));


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'transparent',
            padding: 0,
            marginHorizontal: 0,
            marginVertical: space.md,
            ...style
        }}>
            <HBox style={{
                gap: space.sm,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: colors.border,
                marginBottom: space.md,
                paddingBottom: space.md * 0.75
            }}>
                <Text style={{ color: colors.text, fontSize: font.lg * 1.15, fontWeight: '800', letterSpacing: -0.5 }}>Recent Feed</Text>
                <Text style={{ color: colors.primary, fontSize: font.sm * 1.75, fontWeight: 'bold' }}>{fetchedPosts.length} POSTS</Text>
            </HBox>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: space.lg, paddingBottom: space.xxl }}
            >
                {fetchedPosts.map((post: { id: string, title: string, content: string, comments: [any] }) =>
                    <VBox
                        key={post.id}
                        style={{
                            backgroundColor: colors.surface,
                            paddingTop: space.md * 0.75,
                            paddingHorizontal: space.md * 1.15,
                            borderWidth: 1,
                            borderRadius: space.md,
                            borderColor: colors.border
                        }}
                    >
                        <VBox style={{ gap: space.sm, paddingBottom: space.md, borderBottomWidth: 1, borderColor: colors.surfaceHighlight }}>
                            <Text style={{
                                color: colors.text,
                                fontSize: font.lg,
                                fontWeight: '700',
                                letterSpacing: 0.25
                            }}>{post.title}</Text>

                            <Text style={{
                                color: colors.textMuted,
                                fontSize: font.md,
                                lineHeight: font.md * 1.5
                            }}>{post.content}</Text>
                        </VBox>
    
                        <CommentCreate 
                            postId={post.id} 
                            comments={post.comments} 
                            onCommentAdded={fetchPosts} 
                        />
                    </VBox>
                )}
            </ScrollView>
        </View>
    );
};
