#!/bin/bash

# Natural pattern: ~400 commits over 12 months
# Completely depatternized with random gaps

START="2025-02-15"
END="2026-02-13"

start_ts=$(date -j -f "%Y-%m-%d" "$START" "+%s")
end_ts=$(date -j -f "%Y-%m-%d" "$END" "+%s")

FILES=("README.md" "src/App.js" "src/components/Header.js" "src/utils/api.js" "package.json")

MSGS=(
    "Fix cart bug" "Update UI" "Add feature" "Refactor code" "Improve performance"
    "Fix styling" "Update deps" "Clean code" "Bug fix" "Add validation"
    "Update README" "Optimize" "Fix error" "Enhance UX" "Improve layout"
    "Fix responsive" "Update API" "Add tests" "Fix typo" "Update config"
)

echo "Creating natural commits (~400 total)..."

count=0
ts=$start_ts

while [ $ts -lt $end_ts ]; do
    day=$(date -r $ts "+%u")
    
    # Skip random days (create gaps)
    if [ $((RANDOM % 100)) -lt 35 ]; then
        ts=$((ts + 86400))
        continue
    fi
    
    # Weekend - 80% skip
    if [ $day -eq 6 ] || [ $day -eq 7 ]; then
        if [ $((RANDOM % 100)) -lt 80 ]; then
            ts=$((ts + 86400))
            continue
        fi
        max_commits=2
    else
        # Weekday - varied activity
        r=$((RANDOM % 100))
        if [ $r -lt 30 ]; then
            max_commits=1
        elif [ $r -lt 60 ]; then
            max_commits=2
        elif [ $r -lt 80 ]; then
            max_commits=3
        elif [ $r -lt 92 ]; then
            max_commits=4
        else
            max_commits=$((5 + RANDOM % 4))  # Rare burst: 5-8
        fi
    fi
    
    # Make commits
    for ((i=0; i<max_commits; i++)); do
        hr=$((10 + RANDOM % 12))
        min=$((RANDOM % 60))
        commit_ts=$((ts + hr * 3600 + min * 60))
        dt=$(date -r $commit_ts "+%Y-%m-%d %H:%M:%S")
        
        # Random file change
        file="${FILES[$((RANDOM % ${#FILES[@]}))]}"
        echo "// $(date +%s)" >> "$file"
        
        # Random message
        msg="${MSGS[$((RANDOM % ${#MSGS[@]}))]}"
        
        GIT_AUTHOR_DATE="$dt" GIT_COMMITTER_DATE="$dt" git add -A >/dev/null 2>&1
        GIT_AUTHOR_DATE="$dt" GIT_COMMITTER_DATE="$dt" git commit -m "$msg" --quiet >/dev/null 2>&1
        
        count=$((count + 1))
        
        if [ $((count % 50)) -eq 0 ]; then
            echo "$count commits..."
        fi
    done
    
    ts=$((ts + 86400))
done

echo ""
echo "✓ Done! Total: $count commits"
echo "Natural pattern with gaps, varied activity, no obvious pattern"
echo ""
git log --oneline -15
