import theme from "assets/theme";

export function modalStyle() {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        border: "none",
        boxShadow: theme.shadows[5],
        borderRadius: '10px',
    }
}