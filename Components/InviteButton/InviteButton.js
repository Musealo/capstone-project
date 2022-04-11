import React from 'react';
import { useState } from 'react';

function InviteButton({ href, children }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
  }

  return (
    <>
      <button
        onClick={copy}
        id="myInput"
        className="bg-btn font-medium uppercase w-60 shadow-md
        rounded-full m-auto px-6 py-2.5"
      >
        {!copied ? 'Copy Invite Link' : 'Copied!'}
      </button>
    </>
  );
}
export default InviteButton;