import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // Plugin to calculate relative time
import 'dayjs/locale/vi';
type Props = {
    type: boolean,
    content: string,
    created_at: Date,
}
export const formattedCreatedAt = (created_at: Date) => {
    dayjs.extend(relativeTime);
    dayjs.locale('vi');
    const formattedDate = dayjs(created_at).fromNow();
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default function Message({ type, content, created_at }: Props) {
    
    return (
        <div className={`flex my-3 ${type ? 'items-end justify-end' : 'items-start justify-start'}`}>
            <div className={`${type ? 'bg-cyan-500' : 'bg-gray-100'} rounded-lg px-4 py-2 max-w-[80%]`}>
                <p className={`${type ? 'text-white' : 'text-gray-900'} text-sm`}>{content}</p>
                <div className={`${type ? 'text-gray-900' : 'text-gray-400'} text-sm`}>{formattedCreatedAt(created_at)}</div>
            </div>
        </div>
    );
}
