insert into price_plan (plan_name, sms_price, call_price) values ('sms 101', 2.35, 0.37);
insert into price_plan (plan_name, sms_price, call_price) values ('call 101', 1.75, 0.65);
insert into price_plan (plan_name, sms_price, call_price) values ('call 201', 1.85, 0.85);


DELETE FROM price_plan
WHERE id NOT IN (
    SELECT MIN(id)
    FROM price_plan
    GROUP BY plan_name, sms_price, call_price
);
DELETE FROM price_plan WHERE plan_name IS NULL OR sms_price IS NULL OR call_price IS NULL;
