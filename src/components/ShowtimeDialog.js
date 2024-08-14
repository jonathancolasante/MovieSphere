import React from 'react';
import { Dialog, DialogTitle, DialogContent} from '@mui/material';
import MyCalendar from './myCalendar';
import { useTranslation } from 'react-i18next';

export default function ShowtimeDialog({ open, onClose, showtimes }) {

    const { t } = useTranslation();
    
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
            <DialogTitle>{t('showtimes')}</DialogTitle>
            <DialogContent>
                <MyCalendar />
            </DialogContent>
        </Dialog>
    );
}
