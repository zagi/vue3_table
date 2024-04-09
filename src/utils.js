const getStatusColorAndIcon = (status) => {
    switch (status) {
        case 'reserved':
            return { color: 'blue', icon: 'mdi-account-clock' };
        case 'toTreat':
            return { color: 'green', icon: 'mdi-stethoscope' };
        case 'finished':
            return { color: 'grey', icon: 'mdi-check' };
        case 'waiting':
            return { color: 'yellow darken-1', icon: 'mdi-clock' };
        case 'inProgress':
            return { color: 'purple', icon: 'mdi-progress-wrench' };
        default:
            return { color: 'grey', icon: 'mdi-help-circle' };
    }
};

const getDueDateColor = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const dayDifference = (due - today) / (1000 * 60 * 60 * 24);

    if (dayDifference < 0) {
        return 'red';
    } else if (dayDifference <= 7) {
        return 'orange';
    }
    return '';
};

const getContactChannelIcon = (channel) => {
    switch (channel) {
        case 'messenger':
            return 'mdi-facebook-messenger';
        case 'form':
            return 'mdi-file-outline';
        case 'file':
            return 'mdi-file-document-outline';
        case 'twitter':
            return 'mdi-twitter';
        case 'facebook':
            return 'mdi-facebook';
        default:
            return 'mdi-help-circle';
    }
};

export { getStatusColorAndIcon, getDueDateColor, getContactChannelIcon }