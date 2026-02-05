@echo off
mkdir public
copy "*Resume.pdf" public\resume.pdf
copy picture.png public\picture.png
copy "C:\Users\kandi\.gemini\antigravity\brain\45d34363-ac7d-48c5-b74a-e41fe3efd9db\ai_teaching_assistant_dashboard_1769535817313.png" public\project1.png
dir public > result.txt
echo DONE >> result.txt
