import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SettingsSectionProps {
    title: string;
    description: string;
    action: (...args: any[]) => void;
    buttonText: string;
    isDarkMode?: boolean;
}

export const SettingsSection = ({
    title,
    description,
    action,
    buttonText,
    isDarkMode = false,
    children
}: React.PropsWithChildren<SettingsSectionProps>) => {
    return (
        <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={isDarkMode ? 'default' : 'secondary'}
                        className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                    >
                        {buttonText}
                    </Button>
                </DialogTrigger>
                <DialogContent className={isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}>
                    <DialogHeader>
                        <DialogTitle className={isDarkMode ? 'text-white' : ''}>{title}</DialogTitle>
                    </DialogHeader>
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { isDarkMode } as any);
                        }
                        return child;
                    })}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SettingsSection;