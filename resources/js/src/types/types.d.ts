interface TForm {
    session?: 'create' | 'edit';
    className?: string;
    initialData?: any;
    isEdit?: boolean;
    onSuccess?: (data?: any) => void;
}

interface FileInfo {
    download_url: string;
    last_modified: number;
    mime_type: string | false;
    name: string;
    preview_url: string | null;
    size: number;
}

type FileOrInfo = File | FileInfo | string;

interface FileUploadProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    onFileChange?: (files: FileOrInfo[]) => void;
    maxSizeInMB?: number;
    value?: string | number | readonly string[] | undefined;
}
