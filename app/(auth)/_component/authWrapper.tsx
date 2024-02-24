import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AuthWrapperProp {
    children: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export const AuthWrapper = ({
    children,
    headerTitle,
    headerLabel,
    backButtonLabel,
    backButtonHref,
}: AuthWrapperProp) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <h1 className='text-3xl flex justify-center items-center font-bold'>{headerTitle}</h1>
                <h1 className='text-xl flex justify-center items-center font-md text-muted-foreground py-2'>{headerLabel}</h1>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Button
                    variant="link"
                    className="font-normal w-full"
                    size="sm"
                    asChild
                >
                    <Link href={backButtonHref}>
                        {backButtonLabel}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

