const styles = `
    <style>
        .startAnim {
            animation-duration: 0.25s;
            animation-name: zoom;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;  
        }

        .endAnim {
            animation-duration: 0.25s;
            animation-name: fade-out;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;  
        }

        @keyframes zoom {
            from {
                opacity: .2;
                transform: scale(.2);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes fade-out {
            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: .0;
                transform: scale(.2);
            }
        }

        .block {
            pointer-events: none;
            position: absolute;
            display: flex;
        }

        .btn {
            opacity: 0;
            width: 30px;
            height: 30px;
            margin-top: auto;
            margin-inline-end: auto;
            padding: 3px 0;
            cursor: pointer;
            pointer-events: all;
        }

        .btn svg {
            width: 30px;
            height: 30px;
        }
    </style>
`;

export default styles;
