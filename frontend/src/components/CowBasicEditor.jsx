function CowBasicEditor({ code, setCode }) {
    return (
        <div className="min-h-full mockup-code w-full max-w-5xl">
            <pre className="w-full min-h-full">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="textarea textarea-neutral bg-neutral w-full resize-y"
                    spellCheck="false"
                    rows={code.split('\n').length || 1}
                    style={{ minHeight: 'fit-content' }}
                ></textarea>
            </pre>
        </div>
    );
}

export default CowBasicEditor;