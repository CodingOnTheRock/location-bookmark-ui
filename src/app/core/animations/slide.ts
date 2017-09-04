import { trigger, state, transition, style, animate } from '@angular/core';

export const slideLTR = trigger('slideLTR',
    [
        transition(
            ':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('200ms', style({ transform: 'translateX(0)', opacity: 1 }))
            ]
        ),
        transition(
            ':leave', [
            style({ transform: 'translateX(0)', opacity: 1 }),
            animate('200ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
            ]
        )
    ]
);

export const slideRTL = trigger('slideRTL',
    [
        transition(
            ':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('200ms', style({ transform: 'translateX(0)', opacity: 1 }))
            ]
        ),
        transition(
            ':leave', [
                style({ transform: 'translateX(0)', opacity: 0 }),
                animate('200ms', style({ transform: 'translateX(100%)', opacity: 1 }))
            ]
        )
    ]
);
