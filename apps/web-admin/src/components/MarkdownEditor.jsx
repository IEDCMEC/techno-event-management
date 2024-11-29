import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { Textarea } from '@chakra-ui/react';

// Dynamically import EasyMDE to avoid SSR issues
const EasyMDE = dynamic(() => import('easymde').then((mod) => mod.default), { ssr: false });

const MarkdownEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const textarea = document.getElementById('editor');
      editorRef.current = new EasyMDE({
        element: textarea,
        initialValue: value,
        toolbar: ['bold', 'italic', 'heading', '|', 'preview'],
        spellChecker: false,
      });

      // Handle content changes
      editorRef.current.codemirror.on('change', () => {
        onChange(editorRef.current.value());
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Cleanup the editor
        editorRef.current = null;
      }
    };
  }, [value, onChange]);

  return (
    <Textarea
      id="editor"
      placeholder="Write your markdown here..."
      style={{ display: 'none' }} // Hide the Textarea, as EasyMDE takes over
    />
  );
};

export default MarkdownEditor;
