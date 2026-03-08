import axios from 'axios';
import React, { useState, useEffect } from "react";
import {
    CardView,
    VBox,
    HBox
} from 'react-native-boxes';
import { CommentCreate } from './CommentCreate';
import { Text, ScrollView } from 'react-native';
import { colors } from '../common/utils/Colors';
import { font, space } from '../common/utils/Sizes';


export default function PostList() {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');

        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content
    }));


    const renderPosts = () => (
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
                maxHeight: space.xxl * 10,
                flexDirection: 'column',
                gap: space.md,
                paddingBottom: space.lg
            }}
        >
            {renderedPosts.map((post: { id: string, title: string, content: string }) =>
                <VBox
                    key={post.id}
                    style={{
                        width: '100%',
                        backgroundColor: colors.lightBlue,
                        borderRadius: space.sm,
                        paddingHorizontal: space.md,
                        paddingTop: space.md * 1.15,
                        paddingBottom: space.sm
                    }}
                >
                    <VBox>
                        <Text style={{
                            color: colors.white,
                            fontSize: font.md * 1.15,
                            fontWeight: '400',
                            paddingBottom: space.sm
                        }}>
                            {post.title}
                        </Text>
                        <Text style={{
                            color: colors.textMuted,
                            fontSize: font.md,
                            paddingBottom: space.sm / 2
                        }}>
                            {post.content}
                        </Text>
                    </VBox>

                    <CommentCreate postId={post.id}/>
                </VBox>
            )}
        </ScrollView>
    );

    return (
        <CardView style={{
            backgroundColor: colors.darkBlue,
            padding: 0,
            margin: 0
        }}>
            <HBox style={{ justifyContent: 'flex-start', alignItems: 'center', paddingBottom: space.sm }}>
                <Text style={{ color: 'white', fontSize: font.lg, fontWeight: 'bold' }}>Posts</Text>
            </HBox>

            {renderPosts()}
        </CardView>
    );
}