import React, { useRef } from 'react';
import { Button, Popper, ClickAwayListener, Stack } from '@mui/material';
import { X } from 'lucide-react';
import Loader from '../Loader/Loader';

interface Props {
    anchorEl?: HTMLElement | null;
    onClose: () => void;
    onConfirm?: () => void;
    isOpen: boolean;
    isLoading?: boolean;
    title?: string;
    des?: string;
    btnText?: string;
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    btnColor?: 'primary' | 'secondary' | 'delete';
    btnClasses?: string;
    content?: React.ReactNode;
    maxWidth?: string;
}

const getButtonColor = (color: string | undefined) => {
    switch (color) {
        case 'primary':
            return 'primary';
        case 'secondary':
            return 'secondary';
        case 'delete':
            return '!bg-red-600 hover:!bg-red-700 !text-white';
        default:
            return 'primary';
    }
}

const Popup: React.FC<Props> = ({ title, des, btnText, placement = "top-start", anchorEl, onClose, onConfirm, isOpen, isLoading, btnColor, btnClasses, content, maxWidth = '250px' }) => {

    return (
        <Popper
            open={isOpen}
            anchorEl={anchorEl}
            placement={placement}
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'viewport',
                        padding: 8,
                    },
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ]}
            disablePortal
        >
            <ClickAwayListener onClickAway={onClose}>
                <div className={`bg-white p-3 rounded shadow-[0px_0px_12px_4px_#0000002d] w-max`} style={{ width: maxWidth }} onClick={(e) => e.stopPropagation()}>
                    <div className='flex items-start justify-between gap-5 mb-2'>
                        <h4 className='text-sm font-medium text-gray-800'>{title}</h4>
                        <button
                            onClick={onClose}
                            className='text-gray-500 hover:text-gray-800'
                        >
                            <X size={16} />
                        </button>
                    </div>
                    {content}
                    {des &&
                        <p className='text-sm text-gray-600'>{des}</p>
                    }
                    {btnText &&
                        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', mt: 1 }}>
                            <Button size="small" color="error" className={`capitalize! ${btnClasses} ${getButtonColor(btnColor)}`} onClick={onConfirm}>
                                {isLoading ? <Loader type='bar' classes='white' /> : btnText}
                            </Button>
                        </Stack>
                    }
                </div>
            </ClickAwayListener>
        </Popper>
    );
};

export default Popup;
