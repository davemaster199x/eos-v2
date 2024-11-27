import React from 'react';

export const MRILogo = ({ width = 30, height = 30, type = 'circle' }: { width?: number; height?: number; type?: 'circle' | 'square' }) => {
    return type === 'circle' ? (
        <svg width={width} height={height} viewBox="0 0 46 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23V25C46 37.7025 35.7025 48 23 48C10.2975 48 0 37.7025 0 25V23Z" fill="#E74C3C" />
            <rect x="11" y="13" width="25" height="22.7273" fill="url(#pattern0_18_18)" />
            <path d="M22.5 57L32.4593 45.75H12.5407L22.5 57Z" fill="#E74C3C" />
            <defs>
                <pattern id="pattern0_18_18" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_18_18" transform="matrix(0.01 0 0 0.011 0 -0.05)" />
                </pattern>
                <image
                    id="image0_18_18"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    ) : (
        <img src={'../../assets/images/mri.png'} width={width} height={height} />
    );
};

export const SpecialistLogo = ({ width = 30, height = 30, type = 'circle' }: { width?: number; height?: number; type?: 'circle' | 'square' }) => {
    return type === 'circle' ? (
        <svg width={width} height={height} viewBox="0 0 46 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23V25C46 37.7025 35.7025 48 23 48C10.2975 48 0 37.7025 0 25V23Z" fill="#9544BD" />
            <rect x="11" y="13" width="25" height="20.8333" fill="url(#pattern0_32_6)" />
            <path d="M22.5 57L32.4593 45.75H12.5407L22.5 57Z" fill="#9544BD" />
            <defs>
                <pattern id="pattern0_32_6" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_32_6" transform="matrix(0.01 0 0 0.012 0 -0.1)" />
                </pattern>
                <image
                    id="image0_32_6"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABLdJREFUeAHtnU3IVUUYx9/CRZEZRSIGQbZy4Src1KZNthMXIbZoISmCuHCT+UFEUbQqDDTCTUsRqXaRqBCp4KbaqESLCJEKRARBbdHHr/PAES6Hmbl3zjznnXPf+z9weN8zM88zz/P7n3vO3Htnzl1a0iYCIiACIiACIiACIiACIiACIiACIiACIiACC0QAeAZ4AzgAHGz3t4FXgYdiKICHga0TNg9sS/++BbwOPB3re0WWAxuAL4F/iW8nQ6IAq4Bv4mYuNf8AXwDrVqQAk0kBLwG3ZsS2bdLW/gd2zmjr0exGc+Js6sawYo6B5zLEMKAfdpMHPvMgneHj+oq9hLWXqQwW7A4IYtf55d6Od+OY++P2Bp66Z3QhXwMe6yYOPAX81m088PH9UCzd2ObquB1NxbhdAc61+7fAR8CTsQTtZgt8DJyZsHtgX/L3l1iAwJZYPHNZDhyKJHs1NJqqkWQ7gvsjEuebNWIarE/gvUii3w3WaQ/HgJ0goW1fD3fjNZEgI9NGgkiQXgR0yQLdQ3qdOoVGumQVAvQ2lyDeRAv9SZBCgN7mEsSbaKE/CVII0NtcgngTLfQnQQoBeptLEG+ihf4kSCFAb3MJ4k200J8EKQTobS5BvIkW+pMghQC9zSWIN9FCfxKkEKC3OfBu6Itq4IJ3XyX+gJ8jce4t8Ts6W2BvJNG/gH3A9hHsNunb5vWGttdGB7UkIODFUJZzVPZ8Sf6js22XEPw6RwJMhnp5dEA9AmovSZOJzsP/Nv31ZY/8R+kDODoPKkzEeHiUID2DAmyVlE1gHvN2B9jlmfeofQHPNnN63wcuNYnbwpjbif2/iHJ3Izb3Iu1tBJXqx9aCfA8cbtahrB01wJrBATcjgLeH4mqH0SGTq6H2KsskIEEygQ3dXIIMTTjTvwTJBDZ0cwkyNOFM/xIkE9gszduPTuwpCV8DP2Tuf4eGTIB9FBPyZcPX0GbvfULtx1L2VfNp8w5jNQvT3m2Ax4HzIUIqCxI42yxqXd0b+DTDHuvTg1EuWOGpaVx71QObFwykZ7ov9IKeMmq+8HnHM8IF83UkxbZXHXBswSB6pnusF/SUUfPgluORCG1ks2eE+++ReO1xUUPFayxCm/8zVhKCnE4JWauuxipc4HRIDWPnzkGCTEcqQRKM9ApJwKlRJUFqUE/0KUEScGpUSZAa1BN9SpAEnBpVuYIAG5uJGq8U7jaxIrRp2DurIDYrBbgYouhYJkEyBDnlCD7mSoLMIog9I3KZJvpJkFkEsXtb4mvl2Nnep1yCZAjyQR/CmTYSJEMQ+1EAmwr7ZybknOYSZFZBPIfk+nAxQVOCJODUqJIgNagn+pQgCTg1qiRIDeqJPiVIAk6NKglSg3qiTwmSgFOjKiHIT+37BZsh4r3bGsvQpjeGCUFCwIYukyCLIMinkdPoZI1L0rQ+m18Q/TESb43iT6bFm11vi+8jmRzMdrYMBsCJSLw1ine4pww8AlzuZGO/87TGvTMHh40g64HYCqxOGoMe2i/QDbOSCni0fV7W58B+W1HlwG4wF83zWJ5oHz5gvypqr5jl3O1ZMMMvaxuMnhyLgAiIgAiIgAiIgAiIgAiIgAiIgAgsLf0PZLPzNwFYUXUAAAAASUVORK5CYII="
                />
            </defs>
        </svg>
    ) : (
        <img src={'../../assets/images/specialist.png'} alt="logo" width={width} height={height} />
    );
};

export const TherapistLogo = ({ width = 30, height = 30, type = 'circle' }: { width?: number; height?: number; type?: 'circle' | 'square' }) => {
    return type === 'circle' ? (
        <svg width={width} height={height} viewBox="0 0 46 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23V25C46 37.7025 35.7025 48 23 48C10.2975 48 0 37.7025 0 25V23Z" fill="#56A53E" />
            <path d="M23 57L32.5263 45.75H13.4737L23 57Z" fill="#56A53E" />
            <rect x="12" y="12" width="23" height="23" fill="url(#pattern0_32_10)" />
            <defs>
                <pattern id="pattern0_32_10" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_32_10" transform="scale(0.01)" />
                </pattern>
                <image
                    id="image0_32_10"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAC35JREFUeAHtnQnwftUYxyNSxhpNpSTLDCOjyZYtS/5DSI2WQUhkCjFMfzGUoqks0WTJWJoQjWUoMxgTky1ljWzJNqJICkXZ9XG+v57b/3nPe+59z13e5XfvPTPv3HvPfZ7nnOd73nvPOc95znM322xMIwIjAiMCIwIjAgNAANgC2AAcDZwD/Bj4HfB3++lcebonGtFuMQBoFqsisDvwQeDP1E/i+QDwsMXWuoelAQ8Bvlq/DUo5vgI8uIdQzVcl4E7A24H/lkLb/Mb/gDOBu8xXi55IBx4A/KYCb917F3Aw8EBgO2BL++lcec8DTgN+WyHnMpXVE9jmpwbwgwSINwbwPgk8CrhFbumiBR4NfAqQjDhdnCtrsHTAdRFqFwOPbAuINWbc2Ne1ldt7/jB8fRWg9/x/gDcDt+pKackC3mKyVcZRXcled3KAuwGHAWfYa0lzhn8A1wLftXnDtlIM2F70VUranOSlwDeB6+33DeCIWXMPq8v2rqxjgYusLprTqG56Mk8HXqh+qqou6+aevcP3Ac6zf330Npq6/IsAmKWgAfq9Ke5NGQJ3DfAqWcBLEq/ITVI2nWm09wXgqVXyVvoe8DigCrRN6k6fnVimnD0ZOXL11N26Qs7J08Vm5UjuHmVyVy4f2Br4SMmoJktjI3p+SjlAr6nc9OISGS/KFVBCpxGbZv93TMlfmTx7Ki4vUaJu9t/CfOOusXLWZ3hZnwF2sJ/Ofbowwa/+Sf1EF0lzmdV8WoAjbfTShaKFjDckAFVD+bRDQRM64R39jVCnvxb3iiPwxoim7aVGgy8r5C/9GIamWwEfbqtVCf9FsYKJTnjHgibRIFPzDLMGlxTXKlvGzy2LuizlGIawO9mQtZUmFczXxooBF0b0xStLT8dno3sXJPg11J5X+rb+FHGZC7m2/uKP89LM5F4fKwPU6ZAPT/D/e851/sPC+xXg5XPoL1I4XZEAVLPtb6WIozxNGKdm+WHuMe8/kaqhRk+O8GJ9Wl0Hk/idgY9His/z8kepCofFqp0zCt25hPdnGbxdkWj4P5+hMbA/0NWQNlfh80pA3SVDwP1LeM/P4O2SREPjfVJ1qZ1npo8nAl/qsoY1ZJ2cqjSwMZKhNXT9fDqyhFcLX8tIXwSekKrTVF5YzNkGeJCWN4GHAgfZit2vl1FzV+YBcWWBPRNr6+roZZfySWvpeyb4pdsy0y+BU4Bn2RK1MBf2N02Cg4XzFZmGv2UqUVW2gL99UPIOZq2tol3lezJgHiFTtyys6zm9oHgKzFS+nnW5Sg3y85YazMMRIadKWmA6tmiM4qi8JT7xqlObdIka5DVtJADPDgtPv28pow77NTb0LvWzMj8uDc9Fu6gkDA5pWdhGNYjev1oha5Jkhr5t8e8c+tHmaU1wFI+8aW7C0lwum7569h56QxT6B8PlAQ1bQxbjxxRy1o5h0ndoQ8e0n8qxbULYAC/keBde379o0CBqjIOTkGlGGWwwVzUQqkZ5uoaeScE9zrThtqwYTRpD/c6TK+ExN863LbhDrPoPyFyzV2WlM24Gs70sDlWejFV16PqeDJxyR8r/A8tBQK0HvN58YWXrX1b6UxsjnXjDqp5kLCvJ8vyhUPhxwJNSVuiM/9Q0ifUzTV5pXQCRtE1N13I6J/hsvbKLCjSQcaX8jKdr1GGOef/pydHa9FnBufls4N3mt5Tyn22gR5JFZvNsv95CZTOQztPkrsngucFX7H1m4BQmwqa7J6FQpu7RHNhkvHtdWF9+k1lljw9WTpm8fxUczb7TchK5oUGd5B/WNGl+Jj8s1V37VPT61tMm3aSjDIQzHfLq1nmh9OaN3nTOc2bdylr/16RBNBwttQbUrcdK05u9qQlIsuyWeiPGStvARDxN0qtjeb2+Bt7aBCU5V+QCY2snTYo5KbeM3tBZZ6v38b9qInZ8LghhAHJCTdn/1PpQrvxe0gUnu3vbFjV1nOpb9IrRkoB2PR1uHafH9fxcIBIbRrUN7rkmW2VoLUhlapb9jjBXuGeu7HVPJ1f+sIB0hTlKVJsLnLbmvO2H0/LLnXLvcSxrp+YlHzvFVe45iWX0+jryWLm8jrKAbGU+JT1KvEwg9kyZ8vHy9IM792jauexlW+UAkfAFO2gWH3BgVObZs3gGdT8Cp7iUfek9WgsAblkGSHj9nFQw2PG4MtoiP9DJbuTTlCd9QTvIo0em5FwdrBynjwqmiEf4p8dsaJ7t9Fkg2oYaz5PcADRLTm/ve2QyzzVT/qHFONHmS5/OnQVU8C/7nGdI+WjNktHr+xE4bS81NH6nHJpt8jc1ekpsk9i11wDXVa5tC2TwK+CA1my07iBPmqsjnnvUrXOv6SNwlnEptyB5ae4hT5teg52j3DJaoKJMrWFcYlvx1Ei7NVlrydF7ZWkWtFGmog1m3tLOJ+0T1Np76RB8ZQGuWzHgEzMhWR0COVZoP3x/wwOGYAL3SWwjWJ0mSNdES7/3q/vnWzf0FpysrXN3Grr55WrCmtwet26Ar6qoWWG1DrIqPlI5TfmxKp16cQ/YPIREepp1pIvYGZsDfBnNlb0APVcJaxxt69K2NE3sLu0geE0ZuI3yc3XpLZ259u+VmHE3ArQtU2+BrquYRXrzeGqDkJybX+tcXOM4jZ6+k/O69e4tvXkFelCfklLWnPS0Q1cGR62PKwJc041Ivry181SZg8wzd1UPUHovRQKdYPHd2zOa16Qik8q0XyslxA8zK2yPODVCLtvp2jxMPPtZQtFCSmkRTDFbFHBgpjPdMNFPaB3cdI7xiMqROUGWzDLAPftpKULZrixggho/OQRP8Q0yLxGO6f25QJhztG+Q0uCahUybuMpBfCIV9wd/TGykPCcXFOvcPbAba/B6PnL5ek8HPHYCGajjuajwSD4dmguYZ9J5Ll/v6RIOb5fmKp0I+bd/Di+wb9Qg1+TwDYIG2LYpOIn4jJXhkWzD64mJYXH2a7L3jWJb6Lxvr5ZfN89RPOGCmvy6jkUz1e6o1PBX/sG75ZQ3GJrEDtptcpQPIzQty/p0L89nDuCKZFq2o0uNMRWzy8vo9XmYY9zGPBd38oqGLQnxps2Zztbit2CUvkG2juQm5xzGIAfv3T39oM61nw9QtDWlh3vlgQssvzhMxgXxxHYedmjdriC2o157E6+6RIOJVE+VonT3dz09gddElnmq+70cEwFtgE9H4O43ISBxYUGePdtEUOZEgyn0rEIFZnnkJ4rsR5bFeYy3tR3itQudbuzbe5i/nzoPNqpdfWuEWFaXeTrg7mZsVIiLrFeg5+/tuXm8e+w0ipp4AgSY2bQU2VNf0zl6FiBhO9vjvdAwt/i+57EdujN3YnmeQZzrCwYRcAdWKW5Arn0aaQbdfpHcL1fRj/cMgQg0XSqEauv4W4mAmOMOqpx/XaJBlKUPhemTRPpu4cTIKEemaGz47MWfkcs7aDqPWMm5tr191BabtIU6KwBNGLbG2+BOGTTQucqXNEJVtvqcr1vkbe07V2ToqTlDCArz3kjIMbl1GjRdBFrTyxvCvg99mu/mXVKJnbur81miVW7xpi1QwveTQtfQ/2iI7NNzinvjsQIBj1gH5zcWRSX2GE7M/gu68Rgh0EEjTIgoxIfQevGXHVp/4LiQ3etjiDoXfwZvAuC6FwVYiY8M7FLcG48VCNh30uviXkqvosx5WyYYn27+3mFFdcZbZuTr7JMZ1iCKMh2nMUZ97t/NjIfxIlQMaNa1NYi2z/l0Q25dRjpDQF8GsIifVat4HuTkuTWIFrt8+toIdEMEzO9WoZUUD9gvWnmAS8+tQRQz16d9G1ZnZPMIWONssMDEMpfMGpFdbQ3yTNcaJ3iZ43mHCJhT9H2De88zLJixIkoXrzh9XXPtU6v6/ENwUPi8ggB0WPwoKheBEARtO8VmzKUf6UYERgRGBEYEOkHg/9VklQA6PexHAAAAAElFTkSuQmCC"
                />
            </defs>
        </svg>
    ) : (
        <img src="../../assets/images/therapist.png" alt="logo" width={width} height={height} />
    );
};

export const SurgeryLogo = ({ width = 30, height = 30, type = 'circle' }: { width?: number; height?: number; type?: 'circle' | 'square' }) => {
    return type === 'circle' ? (
        <svg width={width} height={height} viewBox="0 0 46 56" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23V25C46 37.7025 35.7025 48 23 48C10.2975 48 0 37.7025 0 25V23Z" fill="#084FD5" />
            <rect x="12" y="11" width="23" height="23" fill="url(#pattern0_32_21)" />
            <path d="M22.5 56L32.4593 44.75H12.5407L22.5 56Z" fill="#084FD5" />
            <defs>
                <pattern id="pattern0_32_21" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_32_21" transform="scale(0.01)" />
                </pattern>
                <image
                    id="image0_32_21"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    ) : (
        <img width={width} height={height} src="../../assets/images/surgery_centers.png" alt="logo" />
    );
};
