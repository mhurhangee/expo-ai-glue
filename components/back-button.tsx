import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import React from 'react';

export const BackButton = () => {
    const handleGoBack = () => {
        router.back();
    };

    return (
        <Button onPress={handleGoBack} size="icon" variant="link" className="rounded-full">
            <Icon name="arrow-left" size={16} variant="primary"/>
        </Button>
    )
}